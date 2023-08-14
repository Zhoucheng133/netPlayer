<template>
    <div>
        <a-input-search @search="onSearch" enter-button></a-input-search>
        <a-tabs default-active-key="song" @change="callback">
            <a-tab-pane key="song" tab="单曲">
                Content of Tab Pane 1
            </a-tab-pane>
            <a-tab-pane key="artist" tab="艺人">
                Content of Tab Pane 2
            </a-tab-pane>
            <a-tab-pane key="album" tab="专辑">
                Content of Tab Pane 3
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
}
</script>

<style scoped>
</style>