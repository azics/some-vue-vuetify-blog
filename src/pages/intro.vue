<template>
    <v-container fluid>
        <v-card>
            <v-card-title>Тестовое задание</v-card-title>
            <v-card-text>
                <p>
                    Напишите простой одностраничный Блог на Vue.js
                </p>
                <p>
                    <strong>Тех задание</strong>
                </p>
                <p>
                    Взять данные <a href="https://jsonplaceholder.typicode.com/posts">отсюда</a>, использовать <a
                        href="https://github.com/typicode/json-server"
                    >документацию</a>.
                </p>
                <p>
                    Сделать список с пагинацией с загрузкой N-количество постов.
                </p>
                <p>
                    Сделать life search по постам и отдельную страницу поста.
                </p>
                <p>
                    <strong>Задание с плюсом</strong>:
                </p>
                <p>
                    На странице поста вывести комментарии(данного поста) с постепенной загрузкой по скролу.
                </p>
                <p>
                    Life search комментария по пользователю.
                </p>
                <p>
                    Сортировку постов по заголовку.
                </p>
                <p>
                    Использовать Nuxt3
                </p>
                <p>
                    <strong>Спецификация </strong>
                </p>
                <p>
                    В следующем списке, перечислены основные моменты:
                </p>
                <p>
                    Требование:
                </p>
                <p>
                    - Запрещается грузить сразу все данные;
                </p>
                <p>
                    - Использовать Composition API;
                </p>
                <p>
                    - Минимальное количество зависимостей - будет плюсом;
                </p>
                <p>
                    - Единый Code Style в проекте;
                </p>
                <p>
                    - Использование TypeScript;
                </p>
                <p>
                    - Запрещается игнорировать TS ошибки <code>// @ts-ignore</code>
                </p>
                <p>
                    - Бандлер Vite;
                </p>
                <p>
                    - Допускается использование UI библиотек (“<a href="https://quasar.dev/">Quasar</a>”, “<a
                        href="https://www.naiveui.com/en-US/os-theme"
                    >Naiveui</a>”, etc);
                </p>
                <p>
                    - Не использовать axios
                </p>
                <p>
                    <strong>Результаты </strong>
                </p>
                <p>
                    Разместите исходный код приложения на (GitHub.com, GitLab.com, Bitbucket.org, etc) в публичном
                    репозитории. Также ссылка на live demo для ознакомления и тестирования.
                </p>
                <p>
                    Примечание: вместо live demo, допускается докеризация проекта для локального воспроизведения веб
                    приложения.
                </p>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<style scoped>
    .read-the-docs {
        color: #888;
    }
</style>