# f-cookie-service
f-cookie-service provides common methods for handling cookies in an isomorphic manner.

<hr>

## Install Package
- Install the package `yarn add @justeat/f-cookie-service`

<hr>

## Available Methods
### `get(string cookieName, defaultValue = null)`
``` bash
import CookieService from '@justeat/f-cookie-service';

const cookieValue = cookieService.get('je-my-name', 'thomas');
```

### `set(string cookieName, string cookieValue, number maxAge)`
``` bash
import CookieService from '@justeat/f-cookie-service';

cookieService.set('je-my-name', 'thomas', (60 * 60 * 15));
```

### `delete(string cookieName)`
``` bash
import CookieService from '@justeat/f-cookie-service';

cookieService.delete('je-my-name');
```
