import { names } from '@/modules'

export function image(filename, module = null) {
  if (module != null && !names.includes(module)) console.warn(`Module { ${module} } does not exist`)
  module = module == null || !names.includes(module) ? 'common' : module

  let filePath = `../modules/${module}/images/${filename}`
  return new URL(filePath, import.meta.url)
}
