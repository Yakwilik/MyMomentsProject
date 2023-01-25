from django import forms

from moments.models import Moment


class MomentForm(forms.ModelForm):

    def __init__(self, *args, **kwargs):
        self.profile = kwargs.pop('profile', None)
        self.request = kwargs.pop('request', None)
        super(MomentForm, self).__init__(*args, **kwargs)

    def save(self):
        title, text = self.cleaned_data['title'], self.cleaned_data['content']
        new_moment = Moment(title=title, content=text, author=self.profile, image=self.request.FILES['image'])
        new_moment.save()

    class Meta:
        model = Moment
        fields = ['title', 'content', 'author', 'image']
