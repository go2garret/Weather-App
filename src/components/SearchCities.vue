<template>
    <div>
        <input class="form-control" type="text" placeholder="Search by city" v-model="searchTerm" @input="search"
            @click.prevent="showResults = true" />

        <ul v-if="searchResults && showResults" class="list-unstyled position-fixed bg-white w-100 text-dark shadow">
            <li v-for="row in searchResults" class="px-3 py-2 cursor-pointer" @click.prevent="selectCity(row)">
                {{ row[1] }}, {{ row[2] }}, {{ row[4] }}
            </li>
        </ul>
    </div>

    <div class="click-outside" v-if="showResults && searchResults" @click.prevent="showResults = false">

    </div>
</template>

<script>
import { Cities } from '@/classes/Cities';

export default {
    emits: ['selectCity'],

    data() {
        return {
            searchTerm: '',
            searchResults: null,
            cities: new Cities(),
            showResults: false
        }
    },

    methods: {
        search(term = this.searchTerm) {
            if (!term || term.length == 0) {
                this.searchResults = null;
            }
            this.showResults = true;
            this.cities.search(this.searchTerm).then(response => {
                this.searchResults = response?.splice(0, 12);
            });
        },

        selectCity(city) {
            const cityObject = {
                city_id: city[0],
                city_name: city[1]
            }
            this.$emit('selectCity', cityObject);
            this.searchTerm = city[1] + ", " + city[2] + ", " + city[4];
            this.showResults = false;
        }
    }
}
</script>

<style lang="scss" scoped>
.form-control {
    width: 100% !important;
    border-radius: 0;
    margin-bottom: 0;
    padding: 0.8rem;
}

ul {
    z-index: 10;

    li {
        &:hover {
            background: var(--vt-c-white-mute);
        }
    }
}

.click-outside {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    width: 100%;
    height: 100dvh;
}
</style>