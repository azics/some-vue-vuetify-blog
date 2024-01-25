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
            :subtitle="post?.userID"
            :text="post?.body"
        >
            <v-divider class="my-3 mx-0"></v-divider>
            <v-card-actions>

                <v-list lines="three">
                    <v-list-subheader>Comments:</v-list-subheader>
                    <v-infinite-scroll
                        :height="250"
                        :items="comments"
                        :onLoad="loadComments"
                    >
                        <v-list-item
                            v-for="(comment, index) in comments"
                            :key="comment.id"
                        >
                            <v-list-item-title>{{comment.name}}</v-list-item-title>

                            <v-list-item-subtitle>
                                {{comment.body}}
                            </v-list-item-subtitle>
                        </v-list-item>
                    </v-infinite-scroll>
                </v-list>
            </v-card-actions>
        </v-card>
    </v-container>

</template>

<script lang="ts">
    import { ref, onMounted, defineComponent, watch } from 'vue';
    import { useRouter } from 'vue-router';

    import type { ApiResponse, Post, Comment } from './types'

    export default defineComponent({
        setup() {
            const router = useRouter();
            const loading = ref < Boolean > (false)

            const post = ref < Post > (null)
            const comments = ref < Comment[] > ([])

            const page = ref < number | null > (1);
            const itemsPerPage = ref < number > (3);

            const postId = ref(router.currentRoute.value.params.id);

            const fetchPost = async () => {
                loading.value = true
                try {
                    const response = await fetch(`http://localhost:3000/posts/${postId}`);
                    const data: Post = await response.json();

                    // Update the reactive variables
                    post.value = data

                } catch (error) {
                    console.error('Error fetching data:', error);
                }

                loading.value = false
            };

            const loadComments = async({ done: (status: 'ok' | 'loading' | 'empty' | 'error') => void }) => {
                try {
                    if (page.value !== null) {
                        done('loading')

                        const response = await fetch(`http://localhost:3000/comments?postId=${postId}&_page=${page.value}&_per_page=${itemsPerPage.value}`);
                        const data: ApiResponse = await response.json();

                        // imitating some delay
                        setTimeout(() => {
                            comments.value = [...comments.value, ...data.data];
                            page.value = data.next
                            done('ok')
                        }, 500)

                    } else {
                        setTimeout(() => {
                            done('empty')
                        }, 500)
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                    done('error')
                }
            }

            onMounted(() => {
                // Fetch initial data on component mount
                fetchPost()
                loadComments()
            });

            return {
                loading, post, comments, loadComments
            }
        }
    })
</script>