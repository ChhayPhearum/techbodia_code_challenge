<template>
    <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ modalInfo.name.official }}</h5>
              <button type="button" class="btn btn-secondary" data-dismiss="modal" aria-label="Close"  @click="closeModal">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
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
                        <tr>
                            <td><img @click="showModal(item)" class="flag" :src=modalInfo.flags.png /></td>
                            <td>{{ modalInfo.name.official }}</td>
                            <td>
                                <span v-for="(name, index) in modalInfo.name.nativeName" v-bind:key="index" class="alterName">
                                    <span>{{ name.official }}</span>
                                </span>
                            </td>
                            <td>
                                <span v-for="(name, index) in modalInfo.altSpellings" v-bind:key="index" class="alterName">
                                    <span>{{ name }}</span>
                                </span>
                            </td>
                            <td>{{ modalInfo.cca2 }}</td>
                            <td>{{ modalInfo.cca3 }}</td>
                            <td>{{ modalInfo.idd.root + modalInfo.idd.suffixes[0] }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </div>
        </div>
    </div>
</template>
  
<script>
    export default {
        props: {
            modalInfo : Object
        },
        methods: {
            closeModal() {
            this.$emit('close-modal-event');
            },
            saveChanges() {
            this.closeModal();
            }
        }
    }
</script>
  
<style scoped>
    /* Override default value of 'none' */
    .modal {
      display: block;
    }
    table {
        margin-bottom: 0px !important;
    }
 </style>