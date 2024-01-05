import ReportDesigner from './ReportDesigner';

const designer = new ReportDesigner({
    event: {
        onSave: function () {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({ success: true });
                }, 3000);
            });
        },
    },
});
designer.mount(document.getElementById('app'));
