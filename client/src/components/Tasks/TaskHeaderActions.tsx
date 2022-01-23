import React from 'react';

import { FilterType } from '../../types';

interface ITaskHeaderActions {
  filter: string;
  filterOnClick: (value: FilterType) => void;
}

const TaskHeaderActions: React.FC<ITaskHeaderActions> = ({
  filter,
  filterOnClick,
}) => {
  return (
    <div className="text-center task-actions">
      <ul>
        <li>
          <span
            id="all"
            className={`${filter === 'all' ? 'font-weight-bold' : ''}`}
            onClick={() => filterOnClick('all')}
          >
            All
          </span>
        </li>
        <li>|</li>
        <li>
          <span
            id="incomplete"
            className={`${filter === 'incomplete' ? 'font-weight-bold' : ''}`}
            onClick={() => filterOnClick('incomplete')}
          >
            Incomplete
          </span>
        </li>
        <li>|</li>
        <li>
          <span
            id="complete"
            className={`${filter === 'complete' ? 'font-weight-bold' : ''}`}
            onClick={() => filterOnClick('complete')}
          >
            Complete
          </span>
        </li>
      </ul>
    </div>
  );
};

export default TaskHeaderActions;
