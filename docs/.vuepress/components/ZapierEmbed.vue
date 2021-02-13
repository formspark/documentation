<template>
  <div id="zapier-widget"/>
</template>

<script>
export default {
  mounted () {
    const service = 'formspark';
    const id = 'zapier-widget'
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src =
        `https://zapier.com/apps/embed/widget.js?services=${service}&html_id=${id}`
    document.head.appendChild(script)
  }
}
</script>

<style scoped>
#zapier-widget {
  margin-top: 2rem;
}
</style>