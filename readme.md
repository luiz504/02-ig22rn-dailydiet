![branches](__badges__/badge-branches.svg)
![functions](__badges__/badge-functions.svg)
![lines](__badges__/badge-lines.svg)
![statements](__badges__/badge-statements.svg)

# Daily Diet
Welcome to the Daily Diet tracker, a simple project crafted both as a learning endeavor and a portfolio showcase.

## Introduction

This project implements basic CRUD (Create, Read, Update, Delete) operations for meals, organized by date, following the design provided in this [Layout](<https://www.figma.com/file/DOo34mE1V7owHxfnVDdHOu/Daily-Diet-%E2%80%A2-Desafio-React-Native-(Community)?type=design&node-id=407%3A97&mode=dev>) and [Challenge Instructions](https://efficient-sloth-d85.notion.site/Desafio-02-Daily-Diet-98b7d85ec7e9428aa0f9f3bceed4380f).

For further details about the development process, please refer to the [Dev Notes section](#dev-notes).


---

[Preview](https://github.com/luiz504/02-ig22rn-dailydiet/assets/53402833/07a5807e-6f06-4990-a63a-6cb2d8bb73e4)

---

## Commands

To run the project using Expo Go:

```bash
npm run start
```

#

If you need access to native code and want to run the prebuilt version, use the following command:

```bash
npx expo run:android
```

This will build and install the application on the connected device via ADB.

#

For a preview build to run the app standalone:

```bash
eas build --platform android --profile preview-apk --local
```

Then, install the preview build using ADB:

```bash
adb install <buildname.apk>
```

**Note**: If you have the prebuilt version already installed, you must uninstall it to enable adb to install the standalone version.

#

To Build an APK Preview version locally
[EAS](https://docs.expo.dev/eas-insights/introduction/#installation) is required:

```bash
eas build --platform android --profile preview-apk --local
```

It will take a while to build, so its time ☕☕☕, after the apk is generated:

```bash
adb install <filename>
```

---

## Dev Notes

<details>
  <summary>Animation between Components in different routes</summary>

If you view the [Layout](<https://www.figma.com/file/DOo34mE1V7owHxfnVDdHOu/Daily-Diet-%E2%80%A2-Desafio-React-Native-(Community)?type=design&node-id=407%3A97&mode=dev>) in play mode and click on the statistics card on the HomePage, you'll notice an animation where the card smoothly blends with the header of the Statistics screen.

I made several attempts to implement this animation using `react-navigation` alongside `react-native-reanimated`. The [documentation](https://reactnavigation.org/docs/7.x/shared-element-transitions) was referred to during this process. However, due to compatibility gaps between the current version and the expo-supported version, I faced challenges.

Though I managed to achieve a closely resembling behavior using the default animation and the `sharedTransitionTag` prop from the `Animated.View` component in `react-native-reanimated`, after thorough testing, I concluded that this approach was too unstable. The instability resulted in errors that disrupted the app during the animation when navigating back from the Statistics screen to the Home screen. Unfortunately, the error messages weren't sufficiently informative.

It appears that this error has been addressed in the newer version of `react-navigation`. However, as the expo-install currently does not support this version, I decided to revert to native animations like `fade` for a more stable experience.

</details>

<details>
  <summary>Tests: TDD and BDD</summary>

This project is relatively straightforward, encompassing a total of 6 screens—3 of which are more robust, while the other 3 are quite basic. The project includes a set of basic reusable components as well as storage actions/utils designed to manage data.

I aimed to initiate the development of each component/feature with a test-first approach, although there were instances where this methodology didn't align. Particularly, with fundamental components like the Button/Form, I opted for the Composition Pattern. Here, my focus was primarily on the component's behavior, and the test's role was mainly to validate styling correctness. Given the simplicity of these components, the effort invested might not yield significant benefits. However, the true strength of Test-Driven Development (TDD) revealed itself in the creation of actions/utils. This process consistently guided me toward identifying business rules and establishing the desired behavior. It's worth noting that integration with the UI aligned closely with expectations for the majority of cases.

Throughout the testing phase of more complex screens, I encountered an issue where tests were passing, but I received console errors pertaining to the use of the `act` wrapper when initiating state changes. The situation appeared inconsistent, as employing `act` around `fireEvent` didn't resolve the unrelated ESLint argument. Subsequent research revealed that `fireEvent` is already encapsulated within the `act` context. The real challenge arose when asserting asynchronous cases, necessitating the use of `waitFor` in most scenarios. Debugging proved to be intricate due to the lack of informative error pointers.

An additional limitation I identified within [React Native Testing Library](https://callstack.github.io/react-native-testing-library/) pertained to handling refs and focus management. I encountered challenges when attempting to ascertain whether a component possessed focus or when triggering imperative functions via refs—such as blur/focus—within the testing environment.

</details>

<details>
  <summary>Storage</summary>

In this project, AsyncStorage is employed as a key:value store, necessitating data management without the conveniences offered by SQL/ORM queries.

The `Meal` entity is designed with methods to facilitate the creation, updating, and deletion of individual Meals. Additionally, an implementation exists for retrieving Meals, grouped by day, and ordered by date/hour in descending order.

To structure storage entries, I adopted the pattern `@daily-diet:meals-yyyy/MM/dd`, grouping Meals by their shared `yyyy/MM/dd` date. However, Meals are stored within an array in this storage entry, there is no limitation for how many Meals can be included in the array, it could be a problem with large-scale queries.

For the management of `Meal` collections, I implemented an additional storage entry using the key pattern `@daily-diet:days`. This entry accommodates an array of `yyyy/MM/dd` strings, which are sorted in order. The array receives updates from meal-related actions, encompassing creation, deletion, and updates of Meals.

<sub>As the project progressed, the consideration of using Unix timestamps came to the fore. This alternative could offer greater efficiency by reducing the frequency of date parsing.</sub>

The current approach to processing `Statistics` is somewhat inefficient, as it involves post-processing that requires traversing through all Meals Collections without storing the results anywhere. If I were to reconstruct this aspect, I would consider establishing a new Storage entry dedicated to housing the statistics object. This new entry would be updated in conjunction with the various `Meal` actions, resulting in a more efficient and streamlined process.

</details>
