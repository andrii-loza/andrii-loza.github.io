$(document).ready(function () {
    $(function () {
        var $container = $('#container'),
            $filterLinks = $('#filters button');

        $container.isotope({
            itemSelector: '.item',
            filter: '*'
        });

        $filterLinks.click(function () {
            var $this = $(this);
            // don't proceed if already selected
            if ($this.hasClass('selected')) {
                // $this.removeClass('selected');
                return;
            }
            $filterLinks.filter('.selected').removeClass('selected');
            $this.addClass('selected');
            // get selector from data-filter attribute
            let selector = $this.data('filter');

            $container.isotope({
                filter: selector
            });
        });

    });
});
