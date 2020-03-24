package com.ustcck.notification;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("com.ustcck.notification");

        noClasses()
            .that()
                .resideInAnyPackage("com.ustcck.notification.service..")
            .or()
                .resideInAnyPackage("com.ustcck.notification.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..com.ustcck.notification.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
