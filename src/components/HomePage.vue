<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <div class="float-start">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">{{ textSort }}</a>
                            <ul class="dropdown-menu">
                                <li><a @click="isSort('asc')" class="dropdown-item" href="#">Ascending </a></li>
                                <li><a @click="isSort('desc')" class="dropdown-item" href="#">Descending </a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-md-6">
                <div class="float-end">
                    <div class="input-group mb-6">
                        <input type="text" v-model="searchString" class="form-control" placeholder="Search by Country Name">
                    </div>
                </div>
            </div>
        </div>
        <hr />
        <div class="row">
            <div class="col-md-12">
                <nav class="float-end" aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item"><a class="page-link" @click="pagePrvious" href="#">Previous</a></li>
                        <li v-for="index in totalPage" :key="index" class="page-item" :class="{ active: index == currrentPage }"><a @click="pagination(index)" class="page-link" href="#">{{ index }}</a></li>
                        <li class="page-item"><a class="page-link" @click="pageNext" href="#">Next</a></li>
                    </ul>
                </nav>
            </div>
            <div class="col-md-12">
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th style="vertical-align: middle;" rowspan="2" scope="col">Flag</th>
                                <th colspan="3" scope="col">Name</th>
                                <th colspan="3" scope="col">Code</th>
                            </tr>
                            <tr>
                                <th scope="col">Official</th>
                                <th scope="col">Native</th>
                                <th scope="col">Alternative</th>
                                <th scope="col">(cca2)</th>
                                <th scope="col">(cca3)</th>
                                <th scope="col">Calling </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item , index) in customCountries" v-bind:key="index">
                                <td><img @click="showModal(item)" class="flag" :src=item.flags.png /></td>
                                <td>{{ item.name.official }}</td>
                                <td>{{ item.name.official }}</td>
                                <td>{{ item.altSpellings[0] }}</td>
                                <td>{{ item.cca2 }}</td>
                                <td>{{ item.cca3 }}</td>
                                <td>{{ item.idd.root + item.idd.suffixes[0] }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <nav class="float-end" aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item"><a class="page-link" @click="pagePrvious" href="#">Previous</a></li>
                        <li v-for="index in totalPage" :key="index" class="page-item" :class="{ active: index == currrentPage }"><a @click="pagination(index)" class="page-link" href="#">{{ index }}</a></li>
                        <li class="page-item"><a class="page-link" @click="pageNext" href="#">Next</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
    <PopupModal :modalInfo=modalInfo v-if="displayModal" @close-modal-event="hideModal" />
</template>
<script>
import PopupModal from './PopupModal.vue'
export default {
    name: "HomePage",
    data(){
        return {
            displayModal: false,
            modalInfo :{},
            countries : [],
            perPage: 25,
            totalItem: 0,
            totalPage: 0,
            currrentPage : 1,
            textSort : "Sorting by",
            searchString: "",
        }
    },
    components: {
        PopupModal
    },
    computed: {
        indexStart() {
            return (this.currrentPage - 1) * this.perPage;
        },
        indexEnd() {
            return this.indexStart + this.perPage;
        },
        customCountries: function(){
            if(this.searchString){
                return this.countries.filter((country) => {
                    return country.name.common.toLowerCase().match(this.searchString.toLowerCase())
                })
            }
            return this.countries.slice(this.indexStart, this.indexEnd);
        }
    },
    methods: {
        isSort(type){
            switch (type) {
                case "asc":
                    this.textSort = "Ascending"
                    this.countries.sort((a, b) => (a.name.official > b.name.official) ? 1 : -1)
                    break;
                case "desc":
                    this.textSort = "Descending"
                    this.countries.sort((a, b) => (a.name.official < b.name.official) ? 1 : -1)
                    break;
                default:
                    break;
            }
        },
        showModal(item) {
            this.displayModal = true;
            this.modalInfo = item
        },
        hideModal() {
            this.displayModal = false;
        },
        get_data () {
            var option = {
                method: 'get',
                url: "https://restcountries.com/v3.1/all?fields=name,flags,cca2,cca3,altSpellings,idd"
            }
            this.axios(option).then((response) => {
                if(response && response.data) {
                    this.countries = response.data 
                    this.totalItem = response.data.length
                }
            }).catch(function (error) {
                console.log(error.data)
            })

        },
        pagination(number){
            this.currrentPage = number
        },
        pagePrvious () {
            if(this.currrentPage > 1){
                this.currrentPage = this.currrentPage - 1
            }
        },
        pageNext () {
            if(this.currrentPage < this.totalPage){
                this.currrentPage = this.currrentPage + 1
            }
        },
        pageCount() {
            this.totalPage = this.totalItem / this.perPage
        }
    },
    beforeMount(){
        this.get_data()
    },
    updated(){
        this.pageCount()
    }
}
</script>
<style>
.flag {
    width: 60px;
    height: 40px;
    margin-right: 8px;
}
.flag:hover {
    cursor: pointer
}
.country_name {
    font-size: 14px;
    color: gray;
}
</style>
