const Task = (props) => {
    const task = props.task;

    return (
        <div key={task.id}>
            <div className='border border-primary rounded-4 p-3'>
                <span>{task.name}</span>
            </div>
            <br/>
        </div>
    );
}

export default Task;
