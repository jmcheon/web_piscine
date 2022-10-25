import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CustomRepository } from './typeorm-ex.decorator';

@CustomRepository(Task)
export class TaskRepository extends Repository<Task> {}

// export type TaskRepositoryType = Repository<Task> & {};

// const TaskRepository: TaskRepositoryType = AppDataSource.getRepository(
//   Task,
// ).extend({});
