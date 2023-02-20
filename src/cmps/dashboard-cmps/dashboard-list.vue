<template>

    <section v-if="Object.keys(dashboardData).length" class='dashboard-container'>

        <div class="bar-chart">
            <div class="bar-chart-title">
                <span v-svg-icon="'priorities'"></span>
                <h1>Tasks status</h1>
            </div>
            <BarChart :chartData="barChartData" :options="barChartOptions" />
        </div>

        <div class="pie-chart">
            <div class="pie-chart-title">
                <span v-svg-icon="'tasks'"></span>
                <h1>Tasks per member</h1>
            </div>
            <PieChart :chartData="pieChartData" :options="pieChartOptions" />
        </div>

        <div class="total-count-container">
            <div class="total-count-title">
                <span v-svg-icon="'info'"></span>
                <h1>General</h1>
            </div>
            <div class="total-count">
                <div class="total-div">
                    <span v-svg-icon="'quest'"></span>
                    <h1>Board tasks</h1>
                    <p>{{ totalTasksCount }}</p>
                </div>
                <span class="separator"></span>
                <div class="total-div">
                    <span v-svg-icon="'workspace'"></span>
                    <h1>Board groups</h1>
                    <p>{{ Object.keys(dashboardData.group).length }}</p>
                </div>
                <span class="separator"></span>
                <div class="total-div">
                    <span v-svg-icon="'largePerson'"></span>
                    <h1>Board members</h1>
                    <p>{{ Object.keys(dashboardData.person).length }}</p>
                </div>
            </div>
        </div>

        <div class="statuses-dashboard">
            <div class="statuses-title">
                <span v-svg-icon="'project'"></span>
                <h1>Task priorities</h1>
            </div>
            <div class="card-container" v-if="dashboardData">
                <div class="card" v-if="priorities.length" v-for="priority in priorities"
                    :style="`background-color:${priority.value}`">
                    <h1 class="card-title">{{ priority.title }}</h1>
                    <h2 class="card-count">{{ priority.count }}</h2>
                </div>
            </div>
        </div>

        <div class="group-dashboard">
            <div class="group-title-dashboard">
                <span v-svg-icon="'group'"></span>
                <h1>Group summary</h1>
            </div>
            <div class="group-list-dashboard" v-if="groups">
                <div v-for="group in groups" :style="`background-color:${group.color}`" class="group-item">
                    <h1>{{ group.title }}</h1>
                    <p>Tasks: {{ group.total }}</p>
                </div>
            </div>
        </div>



    </section>

</template>
<script>
import { BarChart } from 'vue-chart-3'
import { PieChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { boardService } from '../../services/board.service.js'
import { colorService } from '../../services/color.service.js'
import { userService } from '../../services/user.service.js'

Chart.register(...registerables)

export default {
    name: 'dashboard-list',
    props: {},
    components: { BarChart, PieChart },
    data() {
        return {
            barChartData: {
                labels: [],
                datasets: [
                    {
                        barThickness: 60,
                        data: [],
                        backgroundColor: [],
                    },
                ],
            },
            barChartOptions: {
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
            pieChartData: {
                labels: [],
                datasets: [
                    {
                        barThickness: 60,
                        data: [],
                        backgroundColor: [
                            '#77CEFF',
                            '#0079AF',
                            '#123E6B',
                            '#97B0C4',
                            '#A5C8ED',
                        ],
                    },
                ],
            },
            pieChartOptions: {
                responsive: false
            },
            priorities: [],
            totalTasksCount: 0,
            dashboardData: {},
            groups: []

        }
    },
    computed: {
        stats() {
            return this.$store.getters.stats
        },
        board() {
            return this.$store.getters.board
        },
    },
    methods: {
        setStatuses() {
            const data = this.dashboardData
            for (let statusId in data.status) {
                const label = colorService.getLabelById('status', statusId)
                if (!label) continue
                const { title, value } = label
                label.count = data.status[statusId]
                this.barChartData.labels.unshift(title)
                this.barChartData.datasets[0].backgroundColor.unshift(value)
                this.barChartData.datasets[0].data.unshift(label.count)
            }
        },
        setPriorities() {
            const data = this.dashboardData
            const priorities = []
            for (let priorityId in data.priority) {
                const priority = colorService.getLabelById('priority', priorityId)
                const { title, value } = priority
                const count = data.priority[priorityId]
                const p = { title, value, count }
                priorities.push(p)
            }
            this.priorities = priorities
        },
        async setTasksPerMember() {
            const users = await userService.query()
            const data = this.dashboardData
            for (let personId in data.person) {
                const { fullname } = users.find(u => u._id === personId)
                this.pieChartData.labels.unshift(fullname)
                this.pieChartData.datasets[0].data.unshift(data.person[personId].total)

            }
        },
        getTotalTasks() {
            let sum = 0
            for (let g in this.dashboardData.group) {
                sum += this.dashboardData.group[g].total
            }
            this.totalTasksCount = sum
        },
        setGroups() {
            for (let g in this.dashboardData.group) {
                const { color, title, total } = this.dashboardData.group[g]
                this.groups.push({ color, title, total })
            }
        }
    },
    async created() {
        const { id } = this.$route.params
        await this.$store.dispatch({ type: 'queryBoard', filter: { id } })
        this.dashboardData = await boardService.getDashboardData(this.board)
        this.setStatuses()
        this.setPriorities()
        this.getTotalTasks()
        this.setTasksPerMember()
        this.setGroups()
    }
}
</script>