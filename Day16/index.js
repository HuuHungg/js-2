F8.component("counter-app", {
  data: () => {
    return {
      count: 0,
      title: "Counter App",
    };
  },
  template: `
    <h1>{{title}}</h1>
    <h2>Đã đếm: {{count}} lần</h2>
    <button class="increment" >-</button>
    <button class="decrement" >+</button>
    <button class="change">Change Title</button>
  `,
});

F8.component("header-components", {
  template: `<h1>HEADER</h1>`,
});
