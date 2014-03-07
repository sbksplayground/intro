sortActive = "";
var init_controls = function () {
    var headings = $('thead a'),
        select = $('select'),
        more = $('#more'),
        search = $('#search'),
        reset = $('#reset');


    /**
     * Reseting
     */
    reset.click(function() {
        model.reset();
        dash.render();
        init_controls();
        return false;
    });


    /**
     * Filtering
     */
    search.keyup(function () {
        window.clearTimeout($(this).data("timeout"));
        var text = $(this).val()
        $(this).data("timeout", setTimeout(function () {
            console.log("filter " + text);
            model.filterModel(function (data) {
                return (data['BC'].indexOf(text) >= 0);
            });
            dash.render();
            init_controls();
            return false;
        }, 700));
    });


    /**
     * Loading
     */
    more.click(function () {
        var _new_data = $.get('/data', function (data) {
            _new_data = data;
        })
            .done(function () {
                model.injectData(_new_data.parsed);
                dash.render();
                init_controls();
                return false;
            })
            .fail(function () {
                console.log("Fail");
                return false;
            });
    });


    /**
     * Sorting
     */
    headings.click(function () {
        var column = $(this).data('column');
        var revert = 1;
        console.log(sortActive);
        if (column == sortActive) {
            revert *= (-1);
        } else {
            sortActive = "";
        }
        sortActive = column;
        model.sortModel(function (a, b) {
            if (a[column] > b[column]) return (-1) * revert;
            if (a[column] < b[column]) return (1) * revert;
            return 0;
        });
        dash.render(); // should be called automatically
        init_controls();
        return false;
    });


    /**
     * Diferent country
     */
    select.change(function () {
        dash.country = $(this).val();
        dash.render();
        init_controls();
    });
}