<template>
    <header>
        <div class="content">
            <ul class="nav">
                <li @click="changeActiveLink(1)" :class="{active: activeLink}" class="nav-link">Form Page</li>
                <li @click="changeActiveLink(0)" :class="{active: !activeLink}" class="nav-link">Game Page</li>
            </ul>
        </div>
    </header>
</template>

<script>
    export default {
        data() {
            return {
                activeLink: 1
            }
        },
        mounted() {
            this.$router.beforeEach((to, from) => {
                if (to.fullPath == '/') {
                    this.activeLink = 1;
                } else if (to.fullPath == '/game') {
                    this.activeLink = 0;
                }
            });
        },
        methods: {
            changeActiveLink(id) {
                this.activeLink = id;

                if (id) {
                    this.$router.push({ path: '/' });
                } else {
                    this.$router.push({ path: '/game' });
                }
            }
        }   
    }
</script>