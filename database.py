from app import app
from app.models.db import db
from app.models.direct_messages import DirectMessage
from app.models.user import User
from app.models.channel_memberships import ChannelMembership
from app.models.team_memberships import TeamMembership
from app.models.team import Team
from app.models.channels import Channel
from app.models.live_chat import LiveChat

with app.app_context():
    # user = User.query.get(3)
    # print(user)
    # arr = DirectMessage.query.filter(DirectMessage.sender_id == 3).all()
    # print(arr)
    # print(user.sent_messages)
    # print(user.received_messages)

    # dm = DirectMessage.query.get(1)
    # print(dm.sender_id)
    # print(dm.recipient_id)
    # db.session.delete(dm)

    #tm = TeamMembership.query.get(1)
    # cm = ChannelMembership.query.get(1)
    # print("user_id-----  ", cm.user_id)
    # print("channel_id -----  ", cm.channel_id)
    # db.session.delete(cm)

    # _ =[db.session.delete(user) for user in User.query.all()]
    # _ =[db.session.delete(team) for team in Team.query.all()]
    # _ = [db.session.delete(chan) for chan in Channel.query.all()]
    # _ = [db.session.delete(chan_mem) for chan_mem in ChannelMembership.query.all()]
    #db.session.delete(user1)
    team = Team.query.get(1)
    print(team.to_dict_no_assoc())
    team = Channel.query.get(1)
    print(team.to_dict_no_assoc())
    team = DirectMessage.query.get(1)
    print(team.to_dict_no_assoc())
    team = LiveChat.query.get(1)
    print(team.to_dict_no_assoc())
    db.session.commit()
