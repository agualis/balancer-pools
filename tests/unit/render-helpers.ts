import mergeWith from 'lodash.mergewith';
import { render, RenderOptions } from '@testing-library/vue';
import { routes } from '@/router';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { VueQueryPlugin } from 'vue-query';

// Performance: we don't want to load the related components but just the route meta-data to make tests faster
const removeComponentDefinitionsFromRoutes = (
  productionRoutes: RouteRecordRaw[]
) => {
  const removeComponentsFromRoute = (route: RouteRecordRaw) => {
    route.component = {};
    if (route.children) {
      route.children.forEach(removeComponentsFromRoute);
    }
  };
  productionRoutes.forEach(removeComponentsFromRoute);
  return productionRoutes;
};

// Production routes prepared for faster tests
const routesWithoutComponentDefinitions =
  removeComponentDefinitionsFromRoutes(routes);

const defaultRouter = createRouter({
  history: createWebHistory(),
  routes: routesWithoutComponentDefinitions,
});

const defaultRenderOptions = {
  global: {
    plugins: [VueQueryPlugin, defaultRouter],
  },
};

function mergeCustomizer(objValue: unknown, srcValue: unknown) {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

export function renderWithDefaults(
  component: unknown,
  overwrites: Partial<RenderOptions> = {}
) {
  const mergedOptions = mergeWith(
    defaultRenderOptions,
    overwrites,
    mergeCustomizer
  );
  return render(component, mergedOptions);
}
