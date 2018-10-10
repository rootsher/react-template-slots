# react-template-slots

## example usage

* before:

```js
import { View, Slot, Template } from 'react-template-slots';

const Layout = () => (
    <div>
        <header>
            <Slot name="header"/>
        </header>
    </div>
);

export default () => (
    <View view={<Layout/>}>
        <Template slot="header">
            <div>header</div>
        </Template>
    </View>
);
```

* after:

```js
<div>
    <header>
        <div>header</div>
    </header>
</div>
```
