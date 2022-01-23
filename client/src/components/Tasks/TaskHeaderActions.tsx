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
          <span onClick={() => filterOnClick('all')}>
            {filter === 'all' ? <b>All</b> : 'All'}
          </span>
        </li>
        <li>|</li>
        <li>
          <span onClick={() => filterOnClick('incomplete')}>
            {filter === 'incomplete' ? <b>Incomplete</b> : 'Incomplete'}
          </span>
        </li>
        <li>|</li>
        <li>
          <span onClick={() => filterOnClick('complete')}>
            {filter === 'complete' ? <b>Complete</b> : 'Complete'}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default TaskHeaderActions;
