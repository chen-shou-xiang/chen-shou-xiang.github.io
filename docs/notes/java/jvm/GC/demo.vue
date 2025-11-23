<template>
  <div style="display: flex">
    <h3
      style="
        display: flex;
        justify-self: center;
        align-items: stretch;
        border: 1px solid red;
      "
    >
      执行用户代码
    </h3>
    <h3
      style="
        display: flex;
        justify-self: center;
        align-items: center;
        border: 1px solid red;
      "
    >
      GC STW
    </h3>
    <h3
      style="
        display: flex;
        justify-self: center;
        align-items: center;
        border: 1px solid red;
      "
    >
      执行用户代码
    </h3>
    <h3
      style="
        display: flex;
        justify-self: center;
        align-items: center;
        border: 1px solid red;
      "
    >
      执行用户代码
    </h3>
  </div>
</template>
<style scoped>
.flex-container {
  display: flex;
  align-items: stretch;
  height: 70px;
  border: 1px solid #000;
  h4 {
    height: 100%;
    margin: 0;
    padding: 0 10px;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    border: 1px solid #000;
  }
}
</style>
