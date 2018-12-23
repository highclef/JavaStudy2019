var button = document.getElementById('btn');

if(button !=null)
{
    button.addEventListener('click',function()
    {
        var radiokey = document.getElementsByName('radiobutton')

        for(var loop = 0; loop < radiokey.length;loop++)
        {
            if(radiokey[loop].checked)
            {
                alert(radiokey[loop].value);
                break;
            }
        }
    })
}