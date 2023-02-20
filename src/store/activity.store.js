import { activityService } from '../services/activity-service.js'

export const activityStore = {
    state() {
        return {
            activities: []
        }
    },
    getters: {
        activities({ activities }) { return activities }
    },
    mutations: {
        setActivities(state, { activities }) {
            state.activities = activities
        },
        saveActivity(state, { activity }) {
            state.activities.unshift(activity)
        },
    },
    actions: {
        async loadActivities(context) {
            try {
                const activities = await activityService.query()
                context.commit({ type: 'setActivities', activities })
            } catch (err) {
                console.log(`Cannot load activities in store`, err)
            }
        },
        async saveActivity({ commit }, { activity }) {
            try {
                const savedActivity = await activityService.save(activity)
                commit({ type: 'saveActivity', savedActivity })
            } catch (err) {
                console.log(`Cannot save activity`, err)
            }
        }
    }
}