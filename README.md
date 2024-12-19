# vue-modular-template

A powerful and flexible Vue.js template for building modular applications. This template is designed to organize your project efficiently while enabling a seamless development workflow. It supports modular file systems, auto-imports, and dynamic route management.

This template uses pinia and tailwindCSS.

## Features

### Modular Filesystem

Each module in the project has its own dedicated structure. The default (`common`) module includes:

- **Initializations**: Global initializations and setup files.
- **Adapters**: Global adapters and adapter setup files.
- **API**: API integration and service configuration files.
- **Components**: Global components files.
- **Database**: Files for managing database interactions (in mind: indexedDB).
- **Images**: Shared images.
- **Global Styles**: Shared styles and theme files.
- **Stores**: Vuex or Pinia store files for shared state management.
- **Views (Layouts)**: Application layout views.
- **Utility Files**: General-purpose utilities for shared functionality.
- **routes.js**: A file that has all the global routes.

### Auto-Imported Helpers

- All helper files in the `helpers` folder are auto-imported into the `$helpers` global variable using `app.use(injectGlobalHelpers(...separated_vars_in_mod))` on `main.js`.
- It allows you to separate helper's proparities as separate global variables by adding the helper module name as a param.

  ```javascript
  file: helpers/assets.js:

  export function image(filename, module=none) {...}


  file: main.js:

  app.use(injectGlobalHelpers('assets'));
  ```

  Result: no global variable properity (assets) in $helpers, and there is another global variable ($image). (that's the current default state).

### Component Structure

Each module can have the following directories (more can be added as needed):

- **components**: Vue components specific to the module.
- **data**: Module-specific data files.
- **forms**: Form-related files and utilities.
- **stores**: Pinia stores for the module.
- **views**: Views specific to the module.

---

### Dynamic Routing

- Each module includes a `routes.js` file that exports an array of routes as the default export.
- These routes are automatically added to the main `router.js` file using the module's `module.js` file. No manual route registration is required.

  #### Example `routes.js`:

  ```javascript
  export default [
    {
      path: '/example',
      name: 'Example',
      component: () => import('./views/ExampleView.vue'),
    },
  ]
  ```

## Adding a New Module

- Create a new folder under src/modules/ with the required subfolders:

  ```fs
  src/modules/[module-name]/
      ├── components/
      ├── data/
      ├── forms/
      ├── stores/
      ├── views/
      ├── routes.js
  ```

- Your routes will be auto-registered in the main router.

### Folder Structure

```
src/
├── modules/                 # Application modules
|   ├── common/              # Default (common) module
|   │   ├── adapters/        # Adapters initialization files
|   │   ├── api/             # API initialization files
|   │   ├── components/      # Gloabl components
|   │   ├── db/              # Database-related files
|   │   ├── images/          # Global Images
|   │   ├── styles/          # Global styles
|   │   ├── stores/          # Global state management files
|   │   ├── views/           # Layout views
|   │   ├── utilities/       # Utility files
|
│   ├── [module-name]/       # Module-specific folder
│   │   ├── components/      # Components for this module
│   │   ├── data/            # Data files
│   │   ├── forms/           # Forms-related files
│   │   ├── stores/          # State management files
│   │   ├── views/           # Views specific to this module
|   │   ├── images/          # Images For this module
│   │   ├── routes.js        # Module routes (auto-registered)
|
├── helpers/                 # Global helpers (auto-imported)
|   ├── assets/              # assets helper module
├── App.vue                  # Vue App File
├── main.js                  # Main application entry
├── router.js                # Router setup file
```

## License

This project is licensed under the MIT License.

You are free to use, modify, and distribute this project, provided you include the original copyright and license notice in any significant portions of the software.

See the [LICENSE](./LICENSE) file for full details.
