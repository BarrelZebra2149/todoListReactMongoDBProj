import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const withDnDContext = (Component) => (props) => (
    <DndProvider backend={HTML5Backend}>
        <Component {...props} />
    </DndProvider>
);

export default withDnDContext(HTML5Backend);
