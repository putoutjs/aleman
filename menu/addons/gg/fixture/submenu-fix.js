// second selected
<ul data-name="menu" className="menu" style="left: 0px; top: 20px;">
    <li data-menu-path="Upload" data-name="menu-item" className="menu-item icon icon-view">
        <label data-menu-path="Upload">Upload</label>
    </li>
    <li data-menu-path="New" data-name="menu-item" className="menu-item icon icon-edit menu-submenu menu-submenu-show">
        <label data-menu-path="New">New</label>
        <ul data-name="menu" className="menu" style="left: 0px; top: 20px;">
            <li data-menu-path="New.File" data-name="menu-item" className="menu-item icon icon-view">
                <label data-menu-path="New.File">File</label>
            </li>
            <li data-menu-path="New.Directory" data-name="menu-item" className="menu-item-selected menu-item icon icon-edit">
                <label data-menu-path="New.Directory">Directory</label>
            </li>
        </ul>
    </li>
</ul>;