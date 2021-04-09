<template>
    <div class="form">
        <div class="content">
            <div class="form">
                <div class="form-main form-item">
                    <div class="form-labels">
                        <label>
                            <span>Фамилия*</span>
                            <input type="text" v-model="state.newClient.surname">
                            <span v-if="v$.newClient.surname.$error">
                                {{ v$.newClient.surname.$errors[0].$message }}
                            </span>
                        </label>
                        <label>
                            <span>Имя*</span>
                            <input type="text" v-model="state.newClient.name">
                            <span v-if="v$.newClient.name.$error">
                                {{ v$.newClient.name.$errors[0].$message }}
                            </span>
                        </label>
                        <label>
                            <span>Отчество</span>
                            <input type="text" v-model="state.newClient.patronymic">
                        </label>
                        <label>
                            <span>Дата рождения*</span>
                            <input type="date" v-model="state.newClient.birthDate">
                            <span v-if="v$.newClient.birthDate.$error">
                                {{ v$.newClient.birthDate.$errors[0].$message }}
                            </span>
                        </label>
                        <label>
                            <span>Номер телефона*</span>
                            <input type="text" v-model="state.newClient.phoneNumber">
                            <span v-if="v$.newClient.phoneNumber.$error">
                                {{ v$.newClient.phoneNumber.$errors[0].$message }}
                            </span>
                            <span v-if="v$.newClient.phoneNumber.checkPhone.error">{{v$.newClient.phoneNumber.checkPhone.errorMessage}}</span>
                        </label>
                        <label>
                            <span>Пол</span>
                            <input type="text" v-model="state.newClient.sex">
                        </label>
                        <label>
                            <span>Группа клиентов*</span>
                            <select
                                multiple="true"
                                v-model="state.newClient.clientGroup"
                                >
                            <option v-for="option in selectOptions.clientGroup" :key="option" :value="option">{{option}}</option>
                            </select>
                            <span v-if="v$.newClient.clientGroup.$error">
                                {{ v$.newClient.clientGroup.$errors[0].$message }}
                            </span>
                        </label>
                        <label>
                            <span>Лечащий врач.</span>
                            <select v-model="state.newClient.therapist">
                                <option disabled value="">Выберите один из вариантов</option>
                                <option v-for="option in selectOptions.therapist" :key="option" :value="option">{{option}}</option>
                            </select>
                        </label>
                        <label>
                            <span>Не отправлять СМС</span>
                            <input type="checkbox" v-model="state.newClient.notSentSMS">
                        </label>
                    </div>
                </div>

                <div class="form-address form-item">
                    <h2>Адрес</h2>

                    <div class="form-labels">
                        <label>
                            <span>Индекс</span>
                            <input type="text" v-model="state.newClient.address.index">
                        </label>
                        <label>
                            <span>Страна</span>
                            <input type="text" v-model="state.newClient.address.country">
                        </label>
                        <label>
                            <span>Область</span>
                            <input type="text" v-model="state.newClient.address.region">
                        </label>
                        <label>
                            <span>Город*</span>
                            <input type="text" v-model="state.newClient.address.city">
                            <span v-if="v$.newClient.address.city.$error">
                                {{ v$.newClient.address.city.$errors[0].$message }}
                            </span>
                        </label>
                        <label>
                            <span>Улица</span>
                            <input type="text" v-model="state.newClient.address.street">
                        </label>
                        <label>
                            <span>Дом</span>
                            <input type="text" v-model="state.newClient.address.house">
                        </label>
                    </div>
                </div>

                <div class="form-passport form-item">
                    <h2>Паспорт</h2>

                    <div class="form-labels">
                        <label>
                            <span>Тип документа*</span>
                            <select v-model="state.newClient.passport.type">
                                <option disabled value="">Выберите один из вариантов</option>
                                <option v-for="option in selectOptions.documentType" :key="option" :value="option">{{option}}</option>
                            </select>
                            <span v-if="v$.newClient.passport.type.$error">
                                {{ v$.newClient.passport.type.$errors[0].$message }}
                            </span>
                        </label>
                        <label>
                            <span>Серия</span>
                            <input type="text" v-model="state.newClient.passport.series">
                        </label>
                        <label>
                            <span>Номер</span>
                            <input type="text" v-model="state.newClient.passport.number">
                        </label>
                        <label>
                            <span>Кем выдан</span>
                            <input type="text" v-model="state.newClient.passport.issuedBy">
                        </label>
                        <label>
                            <span>Дата выдачи*</span>
                            <input type="date" v-model="state.newClient.passport.issueDate">
                        </label>
                    </div>
                </div>

                <button class="form-button" @click="submitForm">Submit</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { reactive, computed } from 'vue'
    import { useVuelidate } from '@vuelidate/core'
    import { required } from '@vuelidate/validators'

    export default {
        setup () {
            const state = reactive({
                newClient: {
                    surname: null,
                    name: null,
                    patronymic: null,
                    birthDate: null,
                    phoneNumber: null,
                    sex: null,
                    clientGroup: [],
                    therapist: '',
                    notSentSMS: null,
                    address: {
                        index: null,
                        country: null,
                        region: null,
                        city: null,
                        house: null,
                    },
                    passport: {
                        type: '',
                        series: null,
                        number: null,
                        issuedBy: null,
                        issueDate: null,
                    },
                }
            });

            const phoneRegEx = /^((\+|7)+([0-9]){10})$/;

            const rules = computed(() => {
                return {
                    newClient: {
                        surname: {required},
                        name: {required},
                        birthDate: {
                            required
                        },
                        phoneNumber: {
                            required,
                            checkPhone(phoneNumber) {
                                return phoneRegEx.test(phoneNumber);
                            }
                        },
                        clientGroup: {required},
                        address: {
                            city: {required},
                        },
                        passport: {
                            type: {required},
                            issueDate: {required},
                        },
                    }
                }
            });

            const v$ = useVuelidate(rules, state);

            return { state, v$ };
        },
        data() {
            return {
                multipleSelections: null,
                selectOptions: {
                    clientGroup: ['VIP', 'Проблемные', 'ОМС'],
                    therapist: ['Иванов', 'Захаров', 'Чернышева'],
                    documentType: ['Паспорт', 'Свидетельство о рождении', 'Вод. удостоверение']
                },
            }
        },
        methods: {
            submitForm() {
                if (!this.v$.newClient.phoneNumber.checkPhone.$response) {
                    this.v$.newClient.phoneNumber.checkPhone.error = true;
                    this.v$.newClient.phoneNumber.checkPhone.errorMessage = "Invalid phone number";
                } 

                this.v$.$validate()

                if (!this.v$.$error) {
                    alert('Form success!');
                } else {
                    alert('Form failed!');
                }
            }
        }
    }
</script>