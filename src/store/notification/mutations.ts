// profile/mutations.ts
import Vue from 'vue';
import { MutationTree } from 'vuex';
import { NotificationState, Notification } from './types';
import { start } from 'repl';
//import { notification } from '.';

export const mutations: MutationTree<NotificationState> = {
    addNotification(state, notification: Notification){
        state.notifications = [...state.notifications, notification];
    },
    removeNotification(state, id: string){
        state.notifications.filter(current => current.id != id);
    }
};