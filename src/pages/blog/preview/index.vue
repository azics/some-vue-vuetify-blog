<template>
    <v-container fluid>
        <v-toolbar>
            <v-btn
                variant="text"
                color="indigo"
                icon="mdi-arrow-left"
                :to="{ name: 'blog-list' }"
            ></v-btn>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-card
            :loading="loading"
            :title="post?.title"
            :text="post?.body"
        >
            <v-divider class="my-3 mx-0"></v-divider>
            <v-card-actions>

                <v-list lines="three">
                    
                    <v-toolbar fluid class="px-2 mb-2">
                        <v-toolbar-title>Comments:</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-select
                            v-model="filterUser"
                            label="filterUser"
                            :items="users"
                            @update:modelValue="triggerLoadEvent"
                        ></v-select>
                    </v-toolbar>
                        
                    <v-infinite-scroll
                        id="infScrll"
                        ref="infScrll"
                        :height="250"
                        :items="comments"
                        :onLoad="loadComments"
                    >
                        <v-list-item
                            v-for="(comment) in comments"
                            :key="comment.id"
                            rounded
                            variant="tonal"
                            class="my-1"
                        >
                            <v-list-item-title>
                                {{comment.name}}
                            </v-list-item-title>

                            <v-list-item-subtitle class="mb-2 mt-1">
                                {{comment.email}}
                            </v-list-item-subtitle>

                            <div>
                                {{comment.body}}
                            </div>
                        </v-list-item>
                    </v-infinite-scroll>
                </v-list>
            </v-card-actions>
        </v-card>
    </v-container>

</template>

<script lang="ts">
    import { ref, onMounted, defineComponent, watch } from 'vue';
    import { VInfiniteScroll } from 'vuetify/components';
    import { useRouter } from 'vue-router';
    import api from '../../../api'; // Import the Api instance

    import type { ApiResponse, Post, Comment, User, User4Front } from './types'

    export default defineComponent({
        setup() {
            const router = useRouter();
            const loading = ref < string | boolean | undefined > (false)

            const post = ref < Post > ({
                userId: 0,
                id: 0,
                title: '',
                body: '',
            })
            const comments = ref < Comment[] > ([])

            const filterUser = ref < string > ('');
            const users = ref < User4Front[] > ([{
                title: "All",
                value: "All",
            }])

            const page = ref < number | null > (1);
            const itemsPerPage = ref < number > (3);

            const postId = ref(router.currentRoute.value.params.id);

            const fetchPost = async () => {
                loading.value = true
                try {
                    const response = await api.get < Post > (`/posts/${postId.value}`);
                    const data: Post = response.data

                    // Update the reactive variables
                    post.value = data

                } catch (error) {
                    console.error('Error fetching data:', error);
                }

                loading.value = false
            };

            // making filter by user

            const infScrll = ref < VInfiniteScroll | null > (null);

            const triggerLoadEvent = () => {
                comments.value = []
                page.value = 1
                if (infScrll.value && infScrll.value.onLoad) {
                    infScrll.value.onLoad({
                        side: 'end',
                        done: async () => {
                            const response = await api.get < ApiResponse > (`/comments?postId=${postId.value}${filterUser.value == 'All' ? '' : '&email=' + filterUser.value}&_page=${page.value}&_per_page=${itemsPerPage.value}`);
                            const data: ApiResponse = response.data

                            setTimeout(() => {
                                comments.value = [...comments.value, ...data.data];
                                page.value = data.next
                                return 'ok'
                            }, 300)
                        }
                    });
                }
            };

            // fetch users

            const loadComments = async({ done }: { done: (status: 'loading' | 'error' | 'empty' | 'ok') => void }) => {
                try {
                    if (page.value !== null) {
                        done('loading')

                        const response = await api.get < ApiResponse > (`/comments?postId=${postId.value}${filterUser.value == 'All' ? '' : '&email=' + filterUser.value}&_page=${page.value}&_per_page=${itemsPerPage.value}`);
                        const data: ApiResponse = response.data

                        // imitating some delay for beautful infinity scrolling, cause json-server works very fast
                        setTimeout(() => {
                            comments.value = [...comments.value, ...data.data];
                            page.value = data.next
                            done('ok')
                        }, 300)

                    } else {
                        setTimeout(() => {
                            done('empty')
                        }, 300)
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                    done('error')
                }
            }

            const getUsers = async () => {
                try {
                    const response = await api.get < User[] > (`/users/?_start=1&_limit=100000`);
                    const data: User[] = response.data

                    // Update the reactive variables
                    users.value = [...users.value, ...data.map(item => ({ title: item.email, value: item.email }))]

                } catch (error) {
                    console.error('Error fetching data:', error);
                }

                loading.value = false
            };

            onMounted(() => {
                // Fetch initial data on component mount
                fetchPost()
                getUsers()
                infScrll.value = document.querySelector('#infScrll') as unknown as VInfiniteScroll
            });

            watch(filterUser, (v) => {
                console.log(v)
            })

            return {
                loading, post, comments, loadComments, users, filterUser, infScrll, triggerLoadEvent
            }
        }
    })
</script>