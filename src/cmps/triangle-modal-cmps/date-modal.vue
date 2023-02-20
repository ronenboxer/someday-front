<template>
    <section class="date-picker">

        <div class="container">
            <div class="calendar-month block">
                <div class="arrow-btn-container">
                    <a class="arrow-btn left" @click="moveMonth(-1)">

                        <span v-svg-icon="'arrowLeft'" class="material-icons icon fontawesome-angle-left">&lt</span>

                    </a>
                    <h2 class="titular">{{ months[monthIdx].toUpperCase() }}</h2>
                    <a class="arrow-btn right" @click="moveMonth(1)">

                        <span v-svg-icon="'arrowRight'" class="material-icons icon fontawesome-angle-right">&gt</span>

                    </a>
                </div>
                <table class="calendar">
                    <thead class="days-week">
                        <tr>
                            <th>S</th>
                            <th>M</th>
                            <th>T</th>
                            <th>W</th>
                            <th>R</th>
                            <th>F</th>
                            <th>S</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="disabledDay"><a class="scnd-font-color">25</a></td>
                            <td class="disabledDay"><a class="scnd-font-color">26</a></td>
                            <td class="disabledDay"><a class="scnd-font-color">27</a></td>
                            <td class="disabledDay"><a class="scnd-font-color">28</a></td>
                            <td class="disabledDay"><a class="scnd-font-color">29</a></td>
                            <td class="disabledDay"><a class="scnd-font-color">31</a></td>
                            <td :class="{ 'selectedDay': day === 1 }"><a class="scnd-font-color">1</a>
                            </td>
                        </tr>
                        <tr>
                            <td :class="{ 'selectedDay': day === 2 }" @click="setDate"><a class="scnd-font-color">2</a>
                            </td>
                            <td :class="{ 'selectedDay': day === 3 }" @click="setDate"><a class="scnd-font-color">3</a>
                            </td>
                            <td :class="{ 'selectedDay': day === 4 }" @click="setDate"><a class="scnd-font-color">4</a>
                            </td>
                            <td :class="{ 'selectedDay': day === 5 }" @click="setDate"><a class="scnd-font-color">5</a>
                            </td>
                            <td :class="{ 'selectedDay': day === 6 }" @click="setDate"><a class="scnd-font-color">6</a>
                            </td>
                            <td :class="{ 'selectedDay': day === 7 }" @click="setDate"><a class="scnd-font-color">7</a>
                            </td>
                            <td :class="{ 'selectedDay': day === 8 }" @click="setDate"><a class="scnd-font-color">8</a>
                            </td>
                        </tr>
                        <tr>
                            <td :class="{ 'selectedDay': day === 9 }" @click="setDate"><a class="scnd-font-color">9</a>
                            </td>
                            <td :class="{ 'selectedDay': day === 10 }" @click="setDate"><a
                                    class="scnd-font-color">10</a></td>
                            <td :class="{ 'selectedDay': day === 11 }" @click="setDate"><a
                                    class="scnd-font-color">11</a></td>
                            <td :class="{ 'selectedDay': day === 12 }" @click="setDate"><a
                                    class="scnd-font-color">12</a></td>
                            <td :class="{ 'selectedDay': day === 13 }" @click="setDate"><a
                                    class="scnd-font-color">13</a></td>
                            <td :class="{ 'selectedDay': day === 14 }" @click="setDate"><a
                                    class="scnd-font-color">14</a></td>
                            <td :class="{ 'selectedDay': day === 15 }" @click="setDate"><a
                                    class="scnd-font-color">15</a></td>
                        </tr>
                        <tr>
                            <td :class="{ 'selectedDay': day === 16 }" @click="setDate"><a
                                    class="scnd-font-color">16</a></td>
                            <td :class="{ 'selectedDay': day === 17 }" @click="setDate"><a
                                    class="scnd-font-color">17</a></td>
                            <td :class="{ 'selectedDay': day === 18 }" @click="setDate"><a
                                    class="scnd-font-color">18</a></td>
                            <td :class="{ 'selectedDay': day === 19 }" @click="setDate"><a
                                    class="scnd-font-color">19</a></td>
                            <td :class="{ 'selectedDay': day === 20 }" @click="setDate"><a
                                    class="scnd-font-color">20</a></td>
                            <td :class="{ 'selectedDay': day === 21 }" @click="setDate"><a
                                    class="scnd-font-color">21</a></td>
                            <td :class="{ 'selectedDay': day === 22 }" @click="setDate"><a
                                    class="scnd-font-color">22</a></td>
                        </tr>
                        <tr>
                            <td :class="{ 'selectedDay': day === 23 }" @click="setDate"><a
                                    class="scnd-font-color">23</a></td>
                            <td :class="{ 'selectedDay': day === 24 }" @click="setDate"><a
                                    class="scnd-font-color">24</a></td>
                            <td :class="{ 'selectedDay': day === 25 }" @click="setDate"><a
                                    class="scnd-font-color">25</a></td>
                            <td :class="{ 'selectedDay': day === 26 }" @click="setDate"><a>26</a></td>
                            <td :class="{ 'selectedDay': day === 27 }" @click="setDate"><a>27</a></td>
                            <td :class="{ 'selectedDay': day === 28 }" @click="setDate"><a>28</a></td>
                            <td :class="{ 'selectedDay': day === 29 }" @click="setDate"><a>29</a></td>
                        </tr>
                        <tr>
                            <td @click="setDate"><a>30</a></td>
                            <td class="disabledDay"><a class="scnd-font-color">1</a></td>
                            <td class="disabledDay"><a class="scnd-font-color">2</a></td>
                            <td class="disabledDay"><a class="scnd-font-color">3</a></td>
                            <td class="disabledDay"><a class="scnd-font-color">4</a></td>
                            <td class="disabledDay"><a class="scnd-font-color">5</a></td>
                            <td class="disabledDay"><a class="scnd-font-color">6</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>


    </section>
</template>
  
<script>

export default {
    name: 'date-picker',
    emits: ['updateTask'],
    props: {
        content: Number
    },
    data() {
        return {
            date: '',
            month: '',
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',],
            monthIdx: null,
            day: null
        }
    },
    methods: {
        setDate(ev) {
            const val = ev.target.innerText
            let date = new Date()
            const year = date.getFullYear()
            const month = this.monthIdx.length === 2 ? this.monthIdx : '0' + (1 + this.monthIdx)
            const day = val.length < 2 ? '0' + val : val
            const formattedDate = `${year}-${month}-${day}`
            const dateToTimestamp = new Date(formattedDate)
            const timestamp = dateToTimestamp.getTime()
            this.$emit('updateTask', { key: 'date', val: timestamp })
        },
        moveMonth(dir) {
            this.monthIdx += dir
            if (this.monthIdx < 0) this.monthIdx = 0
            if (this.monthIdx > 11) this.monthIdx = 11
        }
    },
    created() {
        const date = this.content ? new Date(this.content) : new Date(Date.now())
        this.monthIdx = date.getMonth()
        this.day = date.getDate()
    }

}
</script>