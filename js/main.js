$(document).ready(function () {
    $(function () {
        var $container = $('#container'),
            $filterLinks = $('#filters button');

        setInterval(() => {
            let ageVar = document.getElementById('age');
            const bDay = new Date('1997-03-07');
            ageVar.innerHTML = calculateAge(bDay);
        }, 1000*60*60*24);

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

        const calculateAge = (bDay) => {
            const ageDifMs = Date.now() - bDay.getTime();
            const ageDate = new Date(ageDifMs);
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }
    });
});
