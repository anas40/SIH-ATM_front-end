<template>
  <div id="fullCover">
      <div id="loadLoader"></div>
  </div>
</template>


<style>
#fullCover{
    position: absolute;
    top: 0;
    left: 0;
    /* padding-left: 5%; */
    height: 100% !important;
    width: 100% !important;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999 !important;
}
#loadLoader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #007892;
  border-bottom: 16px solid #007892;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>