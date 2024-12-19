export const def = 'common'
export const names = ['common', 'about']

let routes = []

export function loadRoutes() {
  if (routes.length > 0) return routes

  const route_paths = import.meta.glob(`./**/routes.js`, { eager: true })

  for (const path in route_paths) {
    routes.push(...route_paths[path].default)
  }

  return routes
}

function loadHelpers() {
  let helpers = {}
  const helpers_paths = import.meta.glob(`../helpers/*.js`, { eager: true })

  for (const path in helpers_paths) {
    const module_name = path.split('/').reverse()[0].split('.js')[0]
    helpers[module_name] = helpers_paths[path]
  }

  return helpers
}

export function injectGlobalHelpers(...separate_vars_in_mod) {
  return {
    install(app) {
      const helpers = loadHelpers()

      Object.entries(helpers)
        .filter((mod_details) => separate_vars_in_mod.indexOf(mod_details[0]) > -1)
        .forEach((mod_details) => {
          // mod_details => [mod_name, module]
          Object.entries(mod_details[1]).forEach(
            (mod_prop) => (app.config.globalProperties['$' + mod_prop[0]] = mod_prop[1]),
          )

          delete helpers[mod_details[0]]
        })

      app.config.globalProperties.$helpers = helpers
    },
  }
}

export default {
  def,
  names,
  loadRoutes,
  injectGlobalHelpers,
}
