<ul data-name="menu" class="menu menu-hidden">
    <li data-name="menu-item" className="menu-item icon icon-view menu-item-selected">
        <label data-menu-path="View">View</label>
    </li>
    <li data-name="menu-item" className="menu-item icon icon-edit">
        <label data-menu-path="New">New</label>
        <ul class="menu menu-hidden">
            <li data-name="menu-item" className="menu-item icon icon-view">
                <label data-menu-path="New.File">File</label>
            </li>
            <li data-name="menu-item" className="menu-item icon icon-edit menu-item-selected">
                <label data-menu-path="New.Directory">Directory</label>
            </li>
        </ul>;
    </li>
</ul>;

<ul data-name="menu" class="menu menu-hidden">
    <li data-name="menu-item" className="menu-item icon icon-view menu-item-selected">
        <label data-menu-path="View">View</label>
    </li>
    <li data-name="menu-item" className="menu-item icon icon-edit menu-show-submenu">
        <label data-menu-path="New">New</label>
        <ul data-name="menu" class="menu menu-hidden">
            <li data-name="menu-item" className="menu-item icon icon-view menu-item-selected">
                <label data-menu-path="New.File">File</label>
            </li>
            <li data-name="menu-item" className="menu-item icon icon-edit">
                <label data-menu-path="New.Directory">Directory</label>
            </li>
        </ul>;
    </li>
</ul>;

