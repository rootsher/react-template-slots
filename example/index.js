import { View, Slot, Template } from 'react-template-slots';

const Layout = () => (
    <div>
        <header>
            <Slot name="header"/>
        </header>
    </div>
);

const App = () => (
    <View view={<Layout/>}>
        <Template slot="header">
            <div>header</div>
        </Template>
    </View>
);
