# f-tenant
f-tenant provides middleware for Nuxt based websites to detect the appropriate tenant and locale

> Learn more about how tenant and locale are selected: https://skipthedishes.atlassian.net/wiki/spaces/CW/pages/48333422/How+tenant+and+locale+are+selected

<hr>

## Installation
> A Nuxt based website is required to follow these installation steps; but you can use the exports in other formats too, though these steps will not cover that.

### Install Package
- Install the package `yarn add @justeat/f-tenant`

### Add Middleware
- Create a middleware file in the middleware folder; and add it to the Nuxt Config in the appropriate order.
- The content of the file just needs to import and export the tenant selector.

```
import { TenancySelector } from '@justeat/f-tenant-selector';

export default TenancySelector;
```

### Verify it works
- When loading a page in your software that the middleware applies too, you should see a globalisation module in the store; which should have a correctly applied tenant and locale inside.
- You can read it within your code by using `store.state.globalisation.tenant` or by using `...mapState('globalisation', [ 'tenant' ])`
