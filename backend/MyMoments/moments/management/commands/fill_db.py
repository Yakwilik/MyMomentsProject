from django.core.management import BaseCommand
from moments.models import *
from django.contrib.auth.models import User
from django.utils.timezone import timezone
import requests
import random
import datetime
import copy


class Command(BaseCommand):
    RANDOM_API_KEY = '78c7df1074544d209e549dc135589056'
    RANDOM_TEXT_API = 'https://randommer.io/api/Text/LoremIpsum'
    RANDOM_NAME_API = 'https://randommer.io/api/Name'
    PARAGRAPHS_AMOUNT = 1
    BASE: int = 100000
    SCALE: int = 1
    USERS_NEEDS = BASE * SCALE
    MOMENTS_NEEDS = USERS_NEEDS * 10
    RATES_NEEDS = USERS_NEEDS * 10
    LIKES_NEEDS = MOMENTS_NEEDS * 10
    COMMENTS_NEEDS = LIKES_NEEDS
    FOLLOWERS_NEEDS = USERS_NEEDS ** 2

    TITLE_LEN = 10
    MIN_TEXT_LEN = 20
    MAX_TEXT_LEN = 100

    help = 'fills db with random data'

    def __init__(self):
        super().__init__()
        self.text_dataset = self.generate_words_dataset()
        self.names_set = self.generate_names_set()

    def generate_words_dataset(self):
        params = {'loremType': 'normal', 'type': 'paragraphs', 'number': self.PARAGRAPHS_AMOUNT}
        r = requests.get(
            self.RANDOM_TEXT_API,
            params=params,
            headers={'X-Api-Key': self.RANDOM_API_KEY}
        )
        return r.text.split()

    def generate_names_set(self):
        params = {'nameType': 'fullname', 'quantity': 100}
        r = requests.get(
            self.RANDOM_NAME_API,
            params=params,
            headers={'X-Api-Key': self.RANDOM_API_KEY}
        )
        return r.json()

    def create_text_by_word_length(self, len):
        result_string = str()
        for i in range(len):
            result_string = result_string + random.choice(self.text_dataset) + ' '
        return result_string

    def create_users_and_ref_profiles(self):
        def create_user(user_counter):
            name_choice = f'{random.choice(self.names_set)}{user_counter}'
            name_split = name_choice.split()
            pwd = f'{random.choice(self.text_dataset)}{random.choice(self.text_dataset)}{random.choice(self.text_dataset)}'
            user_dict_repr = {
                'username': name_choice,
                'first_name': name_split[0],
                'last_name': name_split[1],
                'password': pwd,
                'email': f'{random.choice(self.text_dataset)}@domen.mail',
                'is_staff': False,
                'is_active': True,
                'is_superuser': False,
                'last_login': datetime.datetime.now(tz=timezone.utc),
            }
            return user_dict_repr

        users_set = []
        profiles_set = []
        for i in range(self.USERS_NEEDS):
            user = User.objects.create_user(**create_user(i))
            user.save()
            users_set.append(user)
            profile = Profile(user=user)
            profiles_set.append(profile)

        Profile.objects.bulk_create(profiles_set)

    def create_moments(self, users):
        def create_moment(profile):
            moment_fields = {
                'title': self.create_text_by_word_length(self.TITLE_LEN),
                'content': self.create_text_by_word_length(random.randint(self.MIN_TEXT_LEN, self.MAX_TEXT_LEN)),
                'created_date': datetime.datetime.now(tz=timezone.utc),
                'author': profile,
            }
            return moment_fields

        questions_set = [Moment(**create_moment(random.choice(users))) for i in range(self.MOMENTS_NEEDS)]
        Moment.objects.bulk_create(questions_set)

    def create_rates(self, users):
        def create_rate(profile):
            rate_fields = {
                'rate': random.randint(0, 10),
                'profile': profile,
            }
            return rate_fields

        rates_set = [Rate(**create_rate(random.choice(users))) for i in range(self.RATES_NEEDS)]
        Rate.objects.bulk_create(rates_set)

    def create_likes(self, profiles, moments):

        for i in range(self.LIKES_NEEDS):
            try:
                like = add_like(random.choice(moments), random.choice(profiles))
                like.save()
            except django.db.utils.IntegrityError:
                pass

    def create_comments(self, profiles, moments):
        comments_set = [Comment(comment_author=random.choice(profiles),
                                moment=random.choice(moments),
                                text=self.create_text_by_word_length(random.randint(13, 13)))
                        for i in range(self.COMMENTS_NEEDS)
                        ]
        Comment.objects.bulk_create(comments_set)

    def create_followers(self, profiles):
        for i in range(self.FOLLOWERS_NEEDS):
            try:
                followers = Follower(followed_user=random.choice(profiles),
                                     follower=random.choice(profiles))
                followers.save()
            except django.db.utils.IntegrityError:
                pass

    def add_arguments(self, parser):
        parser.add_argument('base', nargs='?', type=int, default=self.BASE)
        parser.add_argument('scale', nargs='?', type=int, default=self.SCALE)

    def handle(self, *args, **options):
        if options.get('base', None) is not None:
            self.BASE = options['base']
        if options.get('scale', None) is not None:
            self.SCALE = options['scale']

        self.USERS_NEEDS = self.BASE * self.SCALE
        self.MOMENTS_NEEDS = self.USERS_NEEDS * 10
        self.RATES_NEEDS = self.USERS_NEEDS * 10
        self.LIKES_NEEDS = self.MOMENTS_NEEDS * 10
        self.COMMENTS_NEEDS = self.LIKES_NEEDS
        self.FOLLOWERS_NEEDS = self.USERS_NEEDS ** 2

        # self.create_users_and_ref_profiles()
        profiles = Profile.objects.all()
        self.create_moments(profiles)
        moments = Moment.objects.all()
        self.create_rates(profiles)
        self.create_likes(profiles, moments)
        self.create_comments(profiles, moments)
        self.create_followers(profiles)
