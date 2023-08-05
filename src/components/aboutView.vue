<template>
    <div>
        {{ version }}
    </div>
</template>

<script>
export default {
    data() {
        return {
            version: "",
        }
    },
    methods: {
        
    },
    mounted() {
        
    },
    created() {
        this.version = process.env.VUE_APP_VERSION
    },
}
</script>

<style scoped>

</style>