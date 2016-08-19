import {Navigation} from 'react-native-navigation';
export const main = () =>{
    return Navigation.startTabBasedApp({
        tabs: [
            {
                label: 'One',
                screen: 'example.FirstTabScreen',
                icon: require('../../img/one.png'),
                selectedIcon: require('../../img/one_selected.png'),
                title: 'Screen One',
                navigatorStyle: {},
            },
            {
                label: 'Two',
                screen: 'example.SecondTabScreen',
                icon: require('../../img/two.png'),
                selectedIcon: require('../../img/two_selected.png'),
                title: 'Screen Two',
                navigatorStyle: {},
            }
        ],
        passProps: {
            str: 'This is a prop passed in \'startTabBasedApp\'!',
            obj: {
                str: 'This is a prop passed in an object!',
                arr: [
                    {
                        str: 'This is a prop in an object in an array in an object!'
                    }
                ]
            },
            num: 1234
        },
        animationType: 'slide-down',
        title: 'Redux Example'
    });
}
