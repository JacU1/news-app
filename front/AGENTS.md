# Repo rules for News App Frontend

This document is a short guide for contributors and AI assistants working in this project.

## 1. Project type
- Angular application
- TypeScript-first
- Standalone components are preferred
- Use modern Angular patterns from Angular 17+

## 2. Main structure
- `src/app/views/` - feature pages and screens
- `src/app/shared/` - reusable components, services, validators, helpers
- `src/app/core/` - app-wide constants, enums, models, config
- `src/app/utils/` - utility helpers
- `src/assets/` - static assets
- `src/environments/` - environment config

## 3. Naming conventions
- Components: `PascalCase` + `*.component.ts`
- Services: `*-service.ts` or `*.service.ts`
- Models/interfaces: `*.interface.ts`, `*.model.ts`
- Guards: `*-guard.ts`
- Directories: kebab-case
- Methods and variables: `camelCase`

## 4. Angular patterns
- Prefer standalone components with explicit `imports`
- Use `inject()` for dependencies inside class constructors when possible
- Prefer `takeUntilDestroyed()` over manual `Subject` cleanup for RxJS streams
- Avoid creating a generic `BasePage` unless it holds real shared logic for many pages
- Prefer `signals` for local UI state (`isSubmitting`, toggles, filters)
- Keep component logic simple and focused on the feature

## 5. Forms
- Use `FormBuilder` and typed controls
- Prefer `nonNullable` forms when value can never be `null`
- Keep validation logic close to the form definition
- Extract complex validation rules to dedicated validators in `shared/classes` or helper files
- Prefer `interface` for the payload shape and `form.getRawValue()` when sending data to the API
- Do not use `ReturnType` as the default pattern for Angular forms; it is less readable than an explicit interface

### Form typing standard
Use an explicit interface for the data model and `nonNullable` for fields that are always present:

```ts
interface LoginFormValue {
  loginName: string;
  password: string;
  rememberMeCheckBox: boolean;
}

readonly form = this.fb.nonNullable.group({
  loginName: ['', Validators.required],
  password: ['', [Validators.required, Validators.minLength(6)]],
  rememberMeCheckBox: false,
});

const payload: LoginFormValue = this.form.getRawValue();
```

This gives stronger TypeScript safety, avoids `null` ambiguity, and keeps the form value aligned with the API contract.

## 6. Services and state
- Put API and business logic in services under `src/app/shared/services/` or domain-specific folders
- Services should be thin and reusable, not page-specific
- Do not put routing or UI logic directly in services

## 7. RxJS and cleanup
- Always unsubscribe or use `takeUntilDestroyed()` for subscriptions created in components
- Do not create custom teardown patterns without a real reason
- Prefer modern Angular lifecycle + RxJS interop helpers

## 8. Styling
- Use SCSS files for component styles
- Keep styles local unless a style is truly shared
- Prefer component-scoped styles over global CSS when possible

## 9. Code quality
- Keep functions small and readable
- Avoid unnecessary abstraction layers
- Prefer explicit code over clever patterns
- Remove dead code and unused imports

## 10. Example patterns

Good modern component pattern:

```ts
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'app-example',
  template: '',
})
export class ExampleComponent {
  private readonly fb = inject(FormBuilder);
  readonly isSubmitting = signal(false);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  submit(): void {
    this.isSubmitting.set(true);

    // stream logic here
    // .pipe(takeUntilDestroyed())
  }
}
```

## 11. Do not do
- Do not add a generic `BasePage` just to hold `destroyed$` and a console log
- Do not duplicate logic across features when a shared service is more appropriate
- Do not over-engineer with complex inheritance where composition would be simpler
- Do not use old Angular patterns if modern Angular solutions are available

## 12. Preferred default approach
When in doubt, prefer:
- `inject()`
- `signals`
- `standalone` components
- `takeUntilDestroyed()`
- service-based business logic
- small, explicit, feature-based code

This repo should stay readable, explicit, and modern without unnecessary abstraction.
