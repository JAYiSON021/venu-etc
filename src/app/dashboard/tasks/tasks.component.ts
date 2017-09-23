import { Message } from 'primeng/primeng';
import { TaskService } from '../../data/tasks.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'vn-tasks',
    templateUrl: './tasks.component.html',
    styles: []
})
export class TasksComponent implements OnInit {

    public _myTasks: any = []; 

    inputTask: String;

    msgs: Message[] = [];

    public doneTasks: string[] = [];

    editTaskName = '';

    editTaskId = '';

    editTaskDisplay: Boolean = false;

    taskData: any;

    taskDataLoaded: Boolean = false;

    constructor(private _taskService: TaskService) { }

    ngOnInit() {
        this.taskInit();
        this._getCounts();
    }

    taskDataInit(fin, unfin): void {
        this.taskData = {
            labels: ['Finished Tasks', 'Unfinished tasks'],
            datasets: [
                {
                    data: [fin, unfin],
                    backgroundColor: [
                        '#36A2EB',
                        '#FF6384'
                    ],
                    hoverBackgroundColor: [
                        '#36A2EB',
                        '#FF6384'
                    ]
                }]
            };
        this.taskDataLoaded = true;
    }

    taskInit(): void {
        this._getDoneTasks();
        this._getMyTasks();
    }

    editTaskInit(id, body): void {
        this.editTaskId = id;
        this.editTaskName = body;
        this.editTaskDisplay = true;
    }

    resetTaskediting(): void {
        this.editTaskId = '';
        this.editTaskName = '';
        this.editTaskDisplay = false;
    }

    resetCounts(): void {
        this.taskDataLoaded = false;
        this._getCounts();
    }

    _getCounts() {
        this._taskService.getCountDone()
            .then(data => {
                const countDone = data.count;
                this._taskService.getCountUnDone()
                .then(datam => {
                    const countUnDone = datam.count;
                    this.taskDataInit(countDone, countUnDone);
                })
                .catch(err => {
                    this._errCatcher(err);
                });

            })
            .catch(err => {
                this._errCatcher(err);
            });
    }

    saveEditedTask(): void {
        const reqBody = { id: this.editTaskId, content: this.editTaskName };
        this._taskService.editTask(reqBody)
            .then(data => {
                this._sccCatcher(data);
                this.taskInit();
                this.resetTaskediting();
            })
            .catch(err => {
                this._errCatcher(err);
            });
    }

    _getDoneTasks(): void {
        this._taskService.getDone()
            .then(data => {
                this.doneTasks = data;
            })
            .catch(err => {
                this._errCatcher(err);
            });
    }

    _getMyTasks(): void {
        this._taskService.getTask()
            .then(data => {
                this._myTasks = data;
            })
            .catch(err => { console.log(err); });
    }

    _submitNewTask(): void {
        const reqBody = { body: this.inputTask };
        this._taskService.newTask(reqBody)
            .then(data => {
                this._sccCatcher(data);
                this.taskInit();
                this.inputTask = '';
                this.resetCounts();
            })
            .catch(err => {
                this._errCatcher(err);
            });
    }

    isChange(ev, id) {
        console.log(ev, id);
        ev === true ? ( this._markAsDone(id) ) : ( this._markAsUnDone(id) );
    }

    _markAsDone(id): void {
        const reqBody = { id: id };
        this._taskService.markAsDone(reqBody)
            .then(data => {
                this._sccCatcher(data);
                this.taskInit();
                this.inputTask = '';
                this.resetCounts();
            })
            .catch(err => {
                this._errCatcher(err);
            });
    }

    _markAsUnDone(id): void {
        const reqBody = { id: id };
        this._taskService.markAsUnDone(reqBody)
            .then(data => {
                this._sccCatcher(data);
                this.taskInit();
                this.inputTask = '';
                this.resetCounts();
            })
            .catch(err => {
                this._errCatcher(err);
            });
    }

    _errCatcher(err): void {
        this.showError(err);
    }

    _sccCatcher(scc): void {
        this.showSuccess(scc.message);
    }

    deletetask(id): void {
        this._taskService.deleteTask(id)
            .then(data => {
                this.showInfo(data.message);
                this.taskInit();
                this.resetCounts();
            })
            .catch(err => {
                this.showError(err);
            });
    }

    showError(err) {
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Error', detail: err});
    }

    showSuccess(scc) {
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'Success', detail: scc});
    }

    showInfo(info) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Info', detail: info});
    }
}
