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
      <span className="font-weight-bold">Filter tasks &nbsp;&nbsp;</span>
      <div className="btn-group">
        <button
          id="all"
          type="button"
          className={`btn btn-success ${filter === 'all' ? 'active' : ''}`}
          onClick={() => filterOnClick('all')}
        >
          All
        </button>
        <button
          id="important"
          type="button"
          className={`btn btn-success ${
            filter === 'important' ? 'active' : ''
          }`}
          onClick={() => filterOnClick('important')}
        >
          Important
        </button>
        <button
          id="complete"
          type="button"
          className={`btn btn-success ${filter === 'complete' ? 'active' : ''}`}
          onClick={() => filterOnClick('complete')}
        >
          Complete
        </button>
        <button
          id="incomplete"
          type="button"
          className={`btn btn-success ${
            filter === 'incomplete' ? 'active' : ''
          }`}
          onClick={() => filterOnClick('incomplete')}
        >
          Incomplete
        </button>
      </div>
    </div>
  );
};

export default TaskHeaderActions;
