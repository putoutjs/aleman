<ul className="menu" style="left: 100px; top: 20px">
    <li data-name="menu-item" className="menu-item">
        <label data-menu-path="view">view</label>
    </li>
    <li data-name="menu-item" className="menu-item">
        <label data-menu-path="edit">edit</label>
    </li>
    <li data-name="menu-item" className="menu-item menu-item-selected">
        <label data-menu-path="rename">rename</label>
    </li>
    <li data-name="menu-item" className="menu-item menu-submenu menu-item-selected menu-submenu-show">
        <label data-menu-path="new">new</label>
        <ul className="menu">
            <li data-name="menu-item" className="menu-item">
                <label data-menu-path="new.file">file</label>
            </li>
            <li data-name="menu-item" className="menu-item">
                <label data-menu-path="new.directory">directory</label>
            </li>
        </ul>
    </li>
</ul>;
