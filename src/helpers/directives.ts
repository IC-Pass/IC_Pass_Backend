export const clickOutSide = {
  mounted: function (el: any, binding: any) {
    el.clickOutsideEvent = function (event: Event) {
      if (!(el == event.target || el.contains(event.target))) {
        binding.value(event, el);
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted: function (el: any) {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};

export default clickOutSide;
