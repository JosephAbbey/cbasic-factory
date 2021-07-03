import * as React from 'react';

type WindowProps = {
    title?: string;
};
const Window: React.FunctionComponent<WindowProps> = ({ children, title }) => (
    <div
        className="container"
        onMouseDown={(el: React.BaseSyntheticEvent) => {
            var windowinstance = el.target;
            while (windowinstance.className != 'container') {
                windowinstance = windowinstance.parentElement;
            }
            try {
                for (var e of windowinstance.parentElement.children) {
                    e.style.zIndex--;
                }
                windowinstance.style.zIndex = 100000;
            } catch {}
        }}
        onMouseMove={(el: React.BaseSyntheticEvent) => {
            var windowinstance = el.target;
            while (windowinstance.className != 'container') {
                windowinstance = windowinstance.parentElement;
            }
            if (windowinstance.dragging) {
                var x = parseInt(windowinstance.style.left) || 0,
                    y = parseInt(windowinstance.style.top) || 0,
                    mouseX = el.nativeEvent.clientX,
                    mouseY = el.nativeEvent.clientY;

                windowinstance.style.left =
                    x + mouseX - windowinstance._startX + 'px';
                windowinstance.style.top =
                    Math.max(y + mouseY - windowinstance._startY, 0) + 'px';
                windowinstance._startX = mouseX;
                windowinstance._startY = mouseY;
            }
        }}
        onMouseUp={(el: React.BaseSyntheticEvent) => {
            var windowinstance = el.target;
            while (windowinstance.className != 'container') {
                windowinstance = windowinstance.parentElement;
            }
            windowinstance.dragging = false;
        }}
    >
        <div
            onMouseDown={(el: React.BaseSyntheticEvent) => {
                var windowinstance = el.target;
                while (windowinstance.className != 'container') {
                    windowinstance = windowinstance.parentElement;
                }
                windowinstance._startX = el.nativeEvent.clientX;
                windowinstance._startY = el.nativeEvent.clientY;
                windowinstance.dragging = true;
            }}
            className="row title-bar"
        >
            <div className="column left">
                <span
                    className="dot"
                    onMouseDown={(el: React.BaseSyntheticEvent) => {
                        var windowinstance = el.target;
                        while (windowinstance.className != 'container') {
                            windowinstance = windowinstance.parentElement;
                        }
                        windowinstance.remove();
                    }}
                    style={{ background: '#ED594A' }}
                ></span>
                <span className="dot" style={{ background: '#FDD800' }}></span>
                <span className="dot" style={{ background: '#5AC05A' }}></span>
            </div>
            <div className="column middle">{title}</div>
        </div>

        <div className="content">{children}</div>
    </div>
);
export default Window;
