<template>
    <VContainer fluid>
        <VLayout
            row
            wrap
        >
            <VFlex>
                <VCard
                    height="400"
                    color="transparent"
                    flat
                >
                    <h1 class="display-3 mt-5">Page Not Found</h1>
                    <div class="grey--text lighten-5">
                        The page you are trying to get to never existed in this reality,
                        or has migrated to a parallel universe.
                    </div>
                    <div class="paragraph-text mt-2">
                        <br />
                        <br />Try going back to home page and repeating your action.
                    </div>
                </VCard>
            </VFlex>
        </VLayout>
    </VContainer>
</template>

<script lang="ts"></script>

<style>
    .paragraph-text {
        font-size: 18px;
    }
</style>