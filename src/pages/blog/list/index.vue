<template>
    <v-container fluid>
        <v-card :loading="loading">
            <v-data-iterator
                :loading="loading"
                :items="posts"
                :items-per-page.sync="itemsPerPageModel"
                :sortBy.sync="sortByModel"
                @update:itemsPerPage="fetchData"
                @update:sortBy="fetchData"
            >
                <template v-slot:header="{ itemsPerPage, setItemsPerPage}">
                    <v-toolbar class="px-2">
                        <v-toolbar-title>Some Title for Blog</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-text-field
                            v-model="search"
                            clearable
                            density="comfortable"
                            hide-details
                            placeholder="Search"
                            prepend-inner-icon="mdi-magnify"
                            style="max-width: 300px;"
                            variant="solo"
                            @update:modelValue="onSearch"
                        ></v-text-field>
                        <v-menu
                            v-model="settingsMenu"
                            :close-on-content-click="false"
                            location="end"
                        >
                            <template v-slot:activator="{ props }">
                                <v-btn
                                    variant="text"
                                    color="indigo"
                                    icon="mdi-cog"
                                    v-bind="props"
                                ></v-btn>
                            </template>

                            <v-card min-width="300">

                                <v-list>
                                    <v-list-item>
                                        <v-select
                                            v-model="itemsPerPageModel"
                                            label="itemsPerPage"
                                            :items="[3,4,6,8,9,16,18,-1]"
                                            @change="(v) => setItemsPerPage(v)"
                                        ></v-select>
                                    </v-list-item>

                                    <v-list-item>
                                        <!-- <v-select
                                            v-model="colsModel"
                                            label="Cols in Row"
                                            :items="[{title: '1', value: 12}, {title: '2', value: 6}, {title: '3', value: 4}, {title: '4', value: 3}, {title: '6', value: 2}]"
                                        ></v-select> -->
                                        <v-slider
                                            :label="`Cols in Row: ${12/colsModel}`"
                                            :model-value="12/colsModel"
                                            color="primary"
                                            track-color="grey"
                                            min="1"
                                            max="6"
                                            :step="1"
                                            tick-size="3"
                                            @update:modelValue="v => colsModel = 12/v"
                                        >
                                        </v-slider>
                                    </v-list-item>

                                    <v-list-item>
                                        <v-switch
                                            v-model="sortByTitleToggler"
                                            color="info"
                                            label="Sort By Title"
                                            hide-details
                                            @update:modelValue="(v) => sortByModel = v ? [{key: 'title'}] : []"
                                        ></v-switch>
                                    </v-list-item>
                                </v-list>
                            </v-card>
                        </v-menu>
                    </v-toolbar>
                </template>

                <template v-slot:default="
                                            {
                                            items
                                            }">
                    <v-container
                        class="pa-2"
                        fluid
                    >
                        <v-row dense>
                            <v-col
                                v-for="item in items"
                                :key="item.title"
                                cols="auto"
                                :md="colsModel"
                            >
                                <v-card
                                    class="pb-3"
                                    border
                                    flat
                                >
                                    <v-list-item
                                        class="mb-2"
                                        :subtitle="item.raw.body"
                                    >
                                        <template v-slot:title>
                                            <div>
                                                <strong class="text-h6 mb-2">{{ item.raw.title
                                                    }}</strong>
                                                <!-- <p>Author:
                                                    <v-chip
                                                        pill
                                                        :to="{ name: 'blog-preview', params: { id: item.raw.id } }"
                                                        link
                                                        density="comfortable"
                                                    >
                                                        <v-avatar start>
                                                            <v-img
                                                                v-if="false"
                                                                src=""
                                                            ></v-img>
                                                            <span>{{'John Leider'.split(' ').map(v =>
                                                                v.charAt(0)).join('')}}</span>
                                                        </v-avatar>

                                                        John Leider
                                                    </v-chip>
                                                </p> -->
                                                <v-divider class="my-3 mx-0"></v-divider>
                                            </div>
                                        </template>
                                    </v-list-item>

                                    <div class="d-flex justify-space-between px-4">
                                        <div class="d-flex align-center text-caption text-medium-emphasis me-1">
                                            <v-icon
                                                icon="mdi-clock"
                                                start
                                            ></v-icon>

                                            <div class="text-truncate">{{
                                                `${Math.round((item.raw.body.length /
                                                60))} minutes` }}</div>
                                        </div>

                                        <v-btn
                                            border
                                            flat
                                            size="small"
                                            class="text-none"
                                            text="Read"
                                            :to="{ name: 'blog-preview', params: { id: item.raw.id } }"
                                        >
                                        </v-btn>
                                    </div>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-container>
                </template>

                <template v-slot:footer>
                    <div
                        v-if="itemsPerPageModel !== -1"
                        class="d-flex align-center justify-center pa-4"
                    >
                        <v-btn
                            :disabled="pageModel === 1"
                            icon="mdi-arrow-collapse-left"
                            density="comfortable"
                            variant="tonal"
                            rounded
                            @click="goToPage(firstPageModel)"
                        ></v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                            :disabled="pageModel === 1"
                            icon="mdi-arrow-left"
                            density="comfortable"
                            variant="tonal"
                            rounded
                            @click="goToPage(prevPageModel)"
                        ></v-btn>

                        <div class="mx-2 text-caption">
                            Page {{ pageModel }} of {{ pageCountModel }}
                        </div>

                        <v-btn
                            :disabled="pageModel >= pageCountModel"
                            icon="mdi-arrow-right"
                            density="comfortable"
                            variant="tonal"
                            rounded
                            @click="goToPage(nextPageModel)"
                        ></v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                            :disabled="pageModel >= pageCountModel"
                            icon="mdi-arrow-collapse-right"
                            density="comfortable"
                            variant="tonal"
                            rounded
                            @click="goToPage(lastPageModel)"
                        ></v-btn>
                    </div>
                </template>
            </v-data-iterator>
        </v-card>
    </v-container>
</template>

<script lang="ts">
    import { ref, onMounted, defineComponent, watch } from 'vue';
    import type { ApiResponse, Post, SortItem } from './types'
    import api from '../../../api'; // Import the Api instance


    export default defineComponent({
        setup() {

            const pageModel = ref < number > (1);
            const itemsPerPageModel = ref < number > (3); // Set your default page size
            const pageCountModel = ref < number > (0);
            const nextPageModel = ref < number | null > (2);
            const prevPageModel = ref < number | null > (null);
            const firstPageModel = ref < number > (1);
            const lastPageModel = ref < number > (1);

            const loading = ref < boolean > (false);
            const settingsMenu = ref < boolean > (false);
            const sortByTitleToggler = ref < boolean > (false);

            const posts = ref < Post[] > ([]);

            const colsModel = ref < number > (4);
            const search = ref < string > ('');
            const sortByModel = ref < SortItem > ([]);

            const fetchData = async () => {
                loading.value = true
                try {
                    //&_sort=title
                    const response = await api.get < ApiResponse > (`/posts?_page=${pageModel.value}&_per_page=${itemsPerPageModel.value}${sortByModel.value?.length ? '&_sort=title' : ''}`);
                    const data: ApiResponse = await response.json();

                    // Update the reactive variables
                    posts.value = data.data
                    pageCountModel.value = data.pages
                    nextPageModel.value = data.next
                    prevPageModel.value = data.prev
                    firstPageModel.value = data.first
                    lastPageModel.value = data.last

                } catch (error) {
                    console.error('Error fetching data:', error);
                }

                loading.value = false
            };

            const goToPage = (page) => {
                pageModel.value = page;
                fetchData()
            }

            const onSearch = () => {
                //
                alert('последняя версия json-server не поддерживает поиск как like, поддерживает только eq search, в свзязы чем не мог организовать поиск')
            }


            onMounted(() => {
                // Fetch initial data on component mount
                fetchData()
            });

            watch(itemsPerPageModel, (newItemsPerPage, oldItemsPerPage) => {
                fetchData()
            });

            watch(sortByModel, (newItemsPerPage, oldItemsPerPage) => {
                fetchData()
            });

            return {
                loading,
                settingsMenu,
                sortByTitleToggler,
                sortByModel,
                colsModel,
                itemsPerPageModel,
                pageModel,
                pageCountModel,
                posts,
                prevPageModel,
                nextPageModel,
                firstPageModel,
                lastPageModel,
                goToPage,
                fetchData,
                search,
                onSearch
            };
        }
    })

</script>