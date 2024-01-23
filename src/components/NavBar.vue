<template>
    <v-app-bar
        color="default"
        class="flex-grow-0"
        app
        dark
    >
        <v-app-bar-nav-icon
            variant="text"
            @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <v-app-bar-title>Some Blog on Vite+Vue+Vuetify+Typescript</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer
        v-model="drawer"
        app
    >
        <v-list>
            <v-list-item
                v-for="item in navItems"
                :key="item.title"
                link
                :to="item.to"
            >
                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
    import { ref, defineComponent } from 'vue';

    export default defineComponent({
        setup() {
            const drawer = ref(true);

            const navItems = ref([
                { title: 'Intro', to: '/' },
                { title: 'Blog', to: '/blog' },
                { title: 'Blog View', to: '/blog/1' }
            ]);

            return {
                drawer,
                navItems,
            };
        },
    });
</script>